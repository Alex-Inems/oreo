/**
 * GameFi Token Contract Hooks
 * 
 * Custom React hooks for interacting with the GameFiToken smart contract.
 * These hooks make it easy to read data from and write data to the blockchain.
 * 
 * Usage example:
 * ```tsx
 * const { data: balance } = useTokenBalance(userAddress);
 * const { write: transfer } = useTokenTransfer();
 * ```
 */

import { useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { GAMEFI_TOKEN_ADDRESS, GAMEFI_TOKEN_ABI, GAMEFI_TOKEN_CHAIN } from "@/lib/wagmi";
import { formatUnits } from "viem";
import { useEffect } from "react";

// ============================================================================
// READ HOOKS (Free - no gas cost)
// ============================================================================

/**
 * Get the token balance for a specific address
 * 
 * @param address - The wallet address to check the balance for
 * @returns Token balance and loading/error states
 * 
 * Example:
 * ```tsx
 * const { data: balance, isLoading } = useTokenBalance("0x123...");
 * // balance will be like "1000.5" (already formatted with decimals)
 * ```
 */
export function useTokenBalance(address?: `0x${string}`) {
    const result = useReadContract({
        // Contract details
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,

        // Which function to call
        functionName: "balanceOf",

        // Function parameters
        args: address ? [address] : undefined,

        // Only fetch if we have an address
        query: {
            enabled: !!address,
            // Refetch every 10 seconds to keep balance up to date
            refetchInterval: 10000,
        },
    });

    // Format the balance from wei (smallest unit) to human-readable tokens
    // e.g., 1000000000000000000 => "1.0"
    const formattedBalance = result.data
        ? formatUnits(result.data as bigint, 18) // 18 decimals (standard for most tokens)
        : "0";

    return {
        ...result,
        balance: formattedBalance,
        balanceRaw: result.data as bigint | undefined,
    };
}

/**
 * Get the total supply of tokens
 * 
 * @returns Total supply and loading/error states
 * 
 * Example:
 * ```tsx
 * const { data: totalSupply } = useTokenTotalSupply();
 * ```
 */
export function useTokenTotalSupply() {
    const result = useReadContract({
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,
        functionName: "totalSupply",
        query: {
            // Total supply rarely changes, so cache for longer
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    });

    const formattedSupply = result.data
        ? formatUnits(result.data as bigint, 18)
        : "0";

    return {
        ...result,
        supply: formattedSupply,
        supplyRaw: result.data as bigint | undefined,
    };
}

/**
 * Get token metadata (name, symbol, decimals)
 * 
 * @returns Token info and loading states
 */
export function useTokenInfo() {
    // Fetch token name
    const { data: name } = useReadContract({
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,
        functionName: "name",
    });

    // Fetch token symbol
    const { data: symbol } = useReadContract({
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,
        functionName: "symbol",
    });

    // Fetch decimals
    const { data: decimals } = useReadContract({
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,
        functionName: "decimals",
    });

    return {
        name: name as string | undefined,
        symbol: symbol as string | undefined,
        decimals: decimals as number | undefined,
    };
}

/**
 * Check how much a spender is allowed to spend on behalf of an owner
 * 
 * @param owner - The address that owns the tokens
 * @param spender - The address that is allowed to spend
 * @returns Allowance amount and loading states
 */
export function useTokenAllowance(owner?: `0x${string}`, spender?: `0x${string}`) {
    const result = useReadContract({
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,
        functionName: "allowance",
        args: owner && spender ? [owner, spender] : undefined,
        query: {
            enabled: !!(owner && spender),
        },
    });

    const formattedAllowance = result.data
        ? formatUnits(result.data as bigint, 18)
        : "0";

    return {
        ...result,
        allowance: formattedAllowance,
        allowanceRaw: result.data as bigint | undefined,
    };
}

// ============================================================================
// WRITE HOOKS (Cost gas - modify blockchain state)
// ============================================================================

/**
 * Transfer tokens to another address
 * 
 * @returns Functions to execute the transfer and track its status
 * 
 * Example:
 * ```tsx
 * const { writeContract, isPending } = useTokenTransfer();
 * 
 * // Send 10 tokens to recipient
 * writeContract({
 *   args: ["0xRecipientAddress", parseUnits("10", 18)]
 * });
 * ```
 */
export function useTokenTransfer() {
    const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

    /**
     * Execute a token transfer
     * 
     * @param to - Recipient address
     * @param amount - Amount in smallest unit (wei). Use parseUnits() to convert.
     */
    const transfer = (to: `0x${string}`, amount: bigint) => {
        writeContract({
            address: GAMEFI_TOKEN_ADDRESS,
            abi: GAMEFI_TOKEN_ABI,
            chainId: GAMEFI_TOKEN_CHAIN,
            functionName: "transfer",
            args: [to, amount],
        });
    };

    return {
        transfer,
        writeContract,
        isPending, // Transaction is being signed/confirmed
        isSuccess, // Transaction was successful
        isError,   // Transaction failed
        error,     // Error details if failed
    };
}

/**
 * Approve a spender to use your tokens
 * 
 * This is typically used before another contract can transfer tokens on your behalf.
 * Example: Approving a DEX to swap your tokens
 * 
 * @returns Functions to execute approval and track its status
 */
export function useTokenApprove() {
    const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

    /**
     * Approve a spender
     * 
     * @param spender - Address that will be allowed to spend
     * @param amount - Amount they can spend (in smallest unit)
     */
    const approve = (spender: `0x${string}`, amount: bigint) => {
        writeContract({
            address: GAMEFI_TOKEN_ADDRESS,
            abi: GAMEFI_TOKEN_ABI,
            chainId: GAMEFI_TOKEN_CHAIN,
            functionName: "approve",
            args: [spender, amount],
        });
    };

    return {
        approve,
        writeContract,
        isPending,
        isSuccess,
        isError,
        error,
    };
}

// ============================================================================
// EVENT WATCHING (Listen to blockchain events in real-time)
// ============================================================================

/**
 * Watch for Transfer events on the blockchain
 * 
 * This allows you to react to transfers in real-time without polling.
 * Useful for updating UI immediately when tokens are sent/received.
 * 
 * @param onTransfer - Callback function when a transfer is detected
 * 
 * Example:
 * ```tsx
 * useWatchTransfers((from, to, amount) => {
 *   console.log(`${amount} tokens transferred from ${from} to ${to}`);
 * });
 * ```
 */
export function useWatchTransfers(
    onTransfer?: (from: string, to: string, amount: bigint) => void
) {
    useWatchContractEvent({
        address: GAMEFI_TOKEN_ADDRESS,
        abi: GAMEFI_TOKEN_ABI,
        chainId: GAMEFI_TOKEN_CHAIN,
        eventName: "Transfer",
        onLogs(logs) {
            // Process each transfer event
            logs.forEach((log) => {
                if (onTransfer && log.args.from && log.args.to && log.args.value) {
                    onTransfer(
                        log.args.from as string,
                        log.args.to as string,
                        log.args.value as bigint
                    );
                }
            });
        },
    });
}
