/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
var ConcreteBuilder1 = /** @class */ (function () {
    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     */
    function ConcreteBuilder1() {
        this.reset();
    }
    ConcreteBuilder1.prototype.reset = function () {
        this.house = new House();
    };
    /**
     * All production steps work with the same product instance.
     */
    ConcreteBuilder1.prototype.produceWalls = function () {
        this.house.parts.push('Walls');
    };
    ConcreteBuilder1.prototype.produceWindows = function () {
        this.house.parts.push('Windows');
    };
    ConcreteBuilder1.prototype.produceDoor = function () {
        this.house.parts.push('Door');
    };
    ConcreteBuilder1.prototype.produceRoof = function () {
        this.house.parts.push('Roof');
    };
    ConcreteBuilder1.prototype.produceSwimmingPool = function () {
        this.house.parts.push('Swimming pool');
    };
    ConcreteBuilder1.prototype.produceGarage = function () {
        this.house.parts.push('Garage');
    };
    ConcreteBuilder1.prototype.produceGarden = function () {
        this.house.parts.push('Garden');
    };
    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     */
    ConcreteBuilder1.prototype.getHouse = function () {
        var result = this.house;
        this.reset();
        return result;
    };
    return ConcreteBuilder1;
}());
/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
var House = /** @class */ (function () {
    function House() {
        this.parts = [];
    }
    House.prototype.listParts = function () {
        console.log("House parts: ".concat(this.parts.join(', '), "\n"));
    };
    return House;
}());
/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
var Director = /** @class */ (function () {
    function Director() {
    }
    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    Director.prototype.buildBasicHouse = function () {
        this.builder.produceWalls();
        this.builder.produceWindows();
        this.builder.produceDoor();
        this.builder.produceRoof();
    };
    Director.prototype.buildLuxuryHouse = function () {
        this.builder.produceWalls();
        this.builder.produceWindows();
        this.builder.produceDoor();
        this.builder.produceRoof();
        this.builder.produceGarage();
        this.builder.produceSwimmingPool();
        this.builder.produceGarden();
    };
    return Director;
}());
/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director) {
    var builder = new ConcreteBuilder1();
    director.setBuilder(builder);
    console.log('Standard basic product:');
    director.buildBasicHouse();
    builder.getHouse().listParts();
    console.log('Standard full featured product:');
    director.buildLuxuryHouse();
    builder.getHouse().listParts();
    // Remember, the Builder pattern can be used without a Director class.
    console.log('Custom product:');
    builder.produceWalls();
    builder.produceDoor();
    builder.produceRoof();
    builder.produceWindows();
    builder.produceSwimmingPool();
    builder.getHouse().listParts();
}
var director = new Director();
clientCode(director);
//# sourceMappingURL=builder.js.map