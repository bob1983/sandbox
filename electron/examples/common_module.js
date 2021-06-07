function greet() {
    this.hello = () => {
        return 'hello';
    };
    this.goodBye = () => {
        return 'good bye';
    };
}

module.exports = greet;
