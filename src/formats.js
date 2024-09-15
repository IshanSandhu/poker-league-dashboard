export function parseFormattedValue(value) {
  if (typeof value === 'string') {
    // Remove currency symbols and commas
    if (value.startsWith('$')) {
      return parseFloat(value.replace(/[$,]/g, ''));
    }
    // Remove percentage symbol and parse float
    if (value.endsWith('%')) {
      return parseFloat(value.replace(/%/g, '')) / 100;
    }
    // Parse as plain number
    return parseFloat(value);
  }
  return value;
}


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
  console.log(number)
  const numAmount = Number(number);

  if (isNaN(numAmount)) {
    return 'Invalid Amount';
  }

  const percentage = (number * 100).toFixed(2);

      // Add appropriate sign and dollar symbol
      if (numAmount < 0) {
        return `${percentage}%`;
      } else {
        return `${percentage}%`;
      }
    
}