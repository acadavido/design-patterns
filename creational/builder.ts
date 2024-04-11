/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
interface Builder {
    produceWalls(): void;
    produceWindows(): void;
    produceDoor(): void;
    produceRoof(): void;
    produceSwimmingPool(): void;
    produceGarage(): void;
    produceGarden(): void
}



/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class CheapHouseBuilder implements Builder {
    private house: House;

    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     */
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.house = new House();
    }

    /**
     * All production steps work with the same product instance.
     */
    public produceWalls(): void {
        this.house.parts.push('Walls');
    }

    public produceWindows(): void {
        this.house.parts.push('Windows');
    }

    public produceDoor(): void {
        this.house.parts.push('Door');
    }

    public produceRoof(): void {
        this.house.parts.push('Roof');
    }

    public produceSwimmingPool(): void {
        this.house.parts.push('Swimming pool');
    }

    public produceGarage(): void {
        this.house.parts.push('Garage');
    }

    public produceGarden(): void {
        this.house.parts.push('Garden');
    }

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
    public getHouse(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}

class CastleBuilder implements Builder {
    private house: House;

    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     */
    constructor(bridge) {
        this.reset();

    }

    public reset(): void {
        this.house = new House();
    }

    /**
     * All production steps work with the same product instance.
     */
    public produceWalls(): void {
        this.house.parts.push('Walls marmol');
    }

    public produceWindows(): void {
        this.house.parts.push('Windows');
    }

    public produceDoor(): void {
        this.house.parts.push('Door');
    }

    public produceRoof(): void {
        this.house.parts.push('Roof');
    }

    public produceSwimmingPool(): void {
        this.house.parts.push('Swimming pool');
    }

    public produceGarage(): void {
        this.house.parts.push('Garage');
    }

    public produceGarden(): void {
        this.house.parts.push('Garden');
    }

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
    public getHouse(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
class House {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`House parts: ${this.parts.join(', ')}\n`);
    }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {

    private builder: Builder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    public buildBasicHouse(): void {
        this.builder.produceWalls();
        this.builder.produceWindows();
        this.builder.produceDoor();
        this.builder.produceRoof();
    }

    public buildFullHouse(): void {
        this.builder.produceWalls();
        this.builder.produceWindows();
        this.builder.produceDoor();
        this.builder.produceRoof();
        this.builder.produceGarage();
        this.builder.produceSwimmingPool();
        this.builder.produceGarden();
    }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director: Director) {
    const builder = new CastleBuilder(4);
    director.setBuilder(builder);

    console.log('Basic house:');
    director.buildBasicHouse();
    builder.getHouse().listParts();

    console.log('Full house:');
    director.buildFullHouse();
    builder.getHouse().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    console.log('Custom house:');
    builder.produceWalls();
    builder.produceDoor();
    builder.produceRoof();
    builder.produceWindows();
    builder.produceSwimmingPool();
    builder.getHouse().listParts();
}

const director = new Director();



clientCode(director);