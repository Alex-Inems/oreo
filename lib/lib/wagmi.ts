/**
 * Web3 Configuration File
 * 
 * This file sets up the entire Web3 infrastructure for the app.
 * It configures:
 * - Which blockchain networks we can connect to
 * - Which wallets users can use (MetaMask, WalletConnect, etc.)
 * - Smart contract details (address and ABI)
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
    metaMaskWallet,
    walletConnectWallet,
    coinbaseWallet,
    rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";

// ============================================================================
// BLOCKCHAIN NETWORK CONFIGURATION
// ============================================================================

/**
 * List of blockchain networks your app supports.
 * 
 * Currently configured for:
 * - Sepolia: Ethereum testnet (free test ETH)
 * - Mainnet: Ethereum production network (real ETH)
 * 
 * To add more networks (Polygon, Arbitrum, etc.):
 * 1. Import them: import { polygon } from "wagmi/chains"
 * 2. Add to the array: [sepolia, mainnet, polygon]
 */
export const chains = [sepolia, mainnet] as const;

// ============================================================================
// WALLET CONFIGURATION
// ============================================================================

/**
 * Configure which wallet options appear in the connection modal.
 * Users will see these options when they click "Connect Wallet".
 * 
 * Common wallets included:
 * - MetaMask: Most popular browser extension wallet
 * - WalletConnect: Connect mobile wallets via QR code
 * - Coinbase Wallet: Coinbase's self-custody wallet
 * - Rainbow: Beautiful mobile-first wallet
 */
const connectors = connectorsForWallets(
    [
        {
            groupName: "Recommended", // Group label in the modal
            wallets: [
                metaMaskWallet,
                walletConnectWallet,
                coinbaseWallet,
                rainbowWallet,
            ],
        },
    ],
    {
        // Your app's name - shows in WalletConnect prompts
        appName: "GameFi Nexus",

        // WalletConnect Project ID (required for WalletConnect v2)
        // Get one free at: https://cloud.walletconnect.com
        projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // TODO: Replace with your actual project ID
    }
);

// ============================================================================
// WAGMI CONFIGURATION
// ============================================================================

/**
 * Main wagmi configuration object.
 * This is the core setup that enables all Web3 features in your app.
 */
export const config = createConfig({
    // Wallet connectors from above
    connectors,

    // Supported blockchain networks
    chains,

    // Storage configuration - persists connection state across page refreshes
    // Using cookie storage for better SSR compatibility with Next.js
    storage: createStorage({
        storage: cookieStorage,
    }),

    // SSR configuration - prevents hydration mismatches in Next.js
    ssr: true,

    // RPC transports - how we communicate with the blockchain
    // Using public RPC endpoints (free but rate-limited)
    // For production, consider using Alchemy or Infura for better reliability
    transports: {
        [sepolia.id]: http(), // Public Sepolia RPC
        [mainnet.id]: http(), // Public Mainnet RPC
    },
});

// ============================================================================
// SMART CONTRACT CONFIGURATION
// ============================================================================

/**
 * GameFi Token Contract Details
 * 
 * IMPORTANT: Update these values with your deployed contract!
 * 
 * To deploy the contract:
 * 1. Use Remix (remix.ethereum.org)
 * 2. Use Hardhat/Foundry
 * 3. Use a deployment service like ThirdWeb
 * 
 * After deployment, update:
 * - contractAddress: Your contract's address on the blockchain
 * - contractChain: Which network it's deployed on
 */

// Contract address - UPDATE THIS after deploying your contract
export const GAMEFI_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

// Which network the contract is deployed on
// Change to mainnet.id if deploying to production
export const GAMEFI_TOKEN_CHAIN = sepolia.id;

/**
 * Contract ABI (Application Binary Interface)
 * 
 * This is like a "menu" that tells your app:
 * - What functions the contract has
 * - What parameters they need
 * - What they return
 * 
 * Extracted from GameToken.sol
 * Only including the functions we actually use to keep the bundle size smaller
 */
export const GAMEFI_TOKEN_ABI = [
    // View functions (read-only, no gas cost)
    {
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },

    // Write functions (cost gas, modify blockchain state)
    {
        inputs: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },

    // Events (emitted when things happen on the blockchain)
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
    },
] as const;
