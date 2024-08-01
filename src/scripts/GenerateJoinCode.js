function generateCode(listLength) {
    codeLength = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const base = characters.length;
  
    return Array.from({ length: codeLength }, (_, i) => {
      const digit = Math.floor(listLength / Math.pow(base, codeLength - 1 - i)) % base;
      return characters[digit];
    }).join('');
  }

  export {generateCode};