import type { Metadata } from 'next'
import InventoryClient from './InventoryClient';

export const metadata: Metadata = {
    title: 'Premium Vehicle Inventory | Velocity',
    description: 'Browse our exclusive collection of luxury and performance vehicles. Verified quality and instant financing available.',
}

export default function InventoryPage() {
    return <InventoryClient />;
}
