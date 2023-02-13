function powerOfTwo(num) {
    while (num >= 1) {
        if (num === 1) {
            return true;
        } else if (num % 2 !== 0) {
            return false;
        }
        num = num / 2;
    }
}