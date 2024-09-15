// utils/currencyFormat.js

/**
 * Formats a number as US currency.
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(amount) {
    // Ensure the input is a number
    const numAmount = Number(amount);
    
    if (isNaN(numAmount)) {
      return 'Invalid Amount';
    }
  
    // Format the absolute value of the amount
    const formatted = Math.abs(numAmount).toFixed(2);
  
    // Add appropriate sign and dollar symbol
    if (numAmount < 0) {
      return `-$${formatted}`;
    } else {
      return `$${formatted}`;
    }
  }
  
  // Example usage:
  // console.log(formatCurrency(123.45));    // "$123.45"
  // console.log(formatCurrency(-67.89));    // "-$67.89"
  // console.log(formatCurrency(1000));      // "$1000.00"
  // console.log(formatCurrency(-0.5));      // "-$0.50"