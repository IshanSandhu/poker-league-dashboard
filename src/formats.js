
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

export function formatPercentage(number)
{
  // Ensure the input is a number
  const numAmount = Number(number);

  // if (isNaN(numAmount)) {
  //   return 'Invalid Amount';
  // }

  const percentage = (number * 100).toFixed(2);

      // Add appropriate sign and dollar symbol
      if (numAmount < 0) {
        return `${percentage}%`;
      } else {
        return `${percentage}%`;
      }
    
}