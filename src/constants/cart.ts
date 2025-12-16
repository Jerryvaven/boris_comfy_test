import { PurchaseType } from '@/types'

export const CART_PRICES: Record<PurchaseType, string> = {
  pdf: "2",
  print: "20",
  bundle: "20",
}

export const PURCHASE_OPTIONS = [
  {
    type: 'pdf' as PurchaseType,
    label: 'PDF Download',
    icon: '✓',
    showIcon: true
  },
  {
    type: 'print' as PurchaseType,
    label: 'Print Edition',
    icon: '',
    showIcon: false
  },
  {
    type: 'bundle' as PurchaseType,
    label: '🎁 Print + PDF Bundle',
    icon: '',
    showIcon: false,
    badge: 'BEST VALUE'
  }
]

export const CART_MESSAGES = {
  EMPTY_CART: "Your cart is empty",
  CONTINUE_SHOPPING: "Continue Shopping",
  PROCEED_CHECKOUT: "Proceed to Checkout",
  TIP_MESSAGE: "Tip: Get the bundle for the same price as print alone!",
  ORDER_SUMMARY: "Order Summary",
  SHOPPING_CART: "Your Shopping Cart"
}

export const PURCHASE_TYPE_LABELS: Record<PurchaseType, string> = {
  pdf: 'PDF Downloads',
  print: 'Print Editions',
  bundle: 'Print + PDF Bundles'
}