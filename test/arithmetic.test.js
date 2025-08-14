describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Unspecified operation" });
                    done();
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operation: foobar" });
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2-1" });
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2.1" });
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2.5 });
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
    });

// TODO: Challenge #1
describe('Subtraction', function () {
    it('subtracts two positive integers', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=42&operand2=21')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 21 });
                done();
            });
    });
    it('subtracts a larger number from a smaller number', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=21&operand2=42')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -21 });
                done();
            });
    });
    it('subtracts zero from a number', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=42&operand2=0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 42 });
                done();
            });
    });
    it('subtracts a number from zero', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=0&operand2=42')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -42 });
                done();
            });
    });
    it('subtracts two negative numbers', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=-21&operand2=-42')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 21 });
                done();
            });
    });
    it('subtracts floating point numbers', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=2.5&operand2=1.2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 1.3 });
                done();
            });
    });
    it('subtracts with exponential notation', function (done) {
        request.get('/arithmetic?operation=subtract&operand1=1.2e1&operand2=2e0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 10 });
                done();
            });
    });
});

describe('Edge Cases', function () {
    it('returns error for missing both operands', function (done) {
        request.get('/arithmetic?operation=add')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                done();
            });
    });
    it('returns error for non-numeric operand', function (done) {
        request.get('/arithmetic?operation=add&operand1=foo&operand2=2')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Invalid operand1: foo" });
                done();
            });
    });
    it('returns error for unsupported operation', function (done) {
        request.get('/arithmetic?operation=modulo&operand1=10&operand2=3')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Invalid operation: modulo" });
                done();
            });
    });
    it('handles large numbers', function (done) {
        request.get('/arithmetic?operation=add&operand1=1000000000&operand2=1000000000')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 2000000000 });
                done();
            });
    });
    it('handles negative zero', function (done) {
        request.get('/arithmetic?operation=add&operand1=-0&operand2=0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0 });
                done();
            });
    });
});
    });

describe('Multiplication', function () {
    it('multiplies a positive integer with zero', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=21&operand2=0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0 });
                done();
            });
    });
    it('multiplies a positive integer and negative integer', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -42 });
                done();
            });
    });
    it('multiplies two negative integers', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 42 });
                done();
            });
    });
    it('multiplies two floating point numbers', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=.5&operand2=0.5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0.25 });
                done();
            });
    });
    it('multiplies supporting exponential notation', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=4.2e1&operand2=1e0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 42 });
                done();
            });
    });
});

    describe('Division', function () {
        it('divides a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 21 });
                    done();
                });
        });
        it('divides a negative integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('divides a positive integer by a non-factor', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        it('divides a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -0.5 });
                    done();
                });
        });
        it('divides zero by a positive integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
    });
});

describe('Power', function () {
    it('raises a number to a positive integer power', function (done) {
        request.get('/arithmetic?operation=power&operand1=2&operand2=3')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 8 });
                done();
            });
    });
    it('raises a number to zero power', function (done) {
        request.get('/arithmetic?operation=power&operand1=5&operand2=0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 1 });
                done();
            });
    });
    it('raises a number to a negative power', function (done) {
        request.get('/arithmetic?operation=power&operand1=2&operand2=-2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0.25 });
                done();
            });
    });
    it('raises zero to a positive power', function (done) {
        request.get('/arithmetic?operation=power&operand1=0&operand2=5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0 });
                done();
            });
    });
    it('raises a negative number to an odd power', function (done) {
        request.get('/arithmetic?operation=power&operand1=-2&operand2=3')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -8 });
                done();
            });
    });
    it('raises a negative number to an even power', function (done) {
        request.get('/arithmetic?operation=power&operand1=-2&operand2=2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 4 });
                done();
            });
    });
    it('raises a number to a fractional power', function (done) {
        request.get('/arithmetic?operation=power&operand1=9&operand2=0.5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 3 });
                done();
            });
    });
});
