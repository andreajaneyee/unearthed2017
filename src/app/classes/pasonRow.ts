/**
 * This class represent a row of the pason data
 */
export class PasonRow {
    // Outputs
    holeDepth: number;
    rotaryTorque: number;
    standpipePressure: number;
    flow: number;
    // Input params
    rotaryRPM: number;
    differentialPressure: number;
    pumpOutput: number;
    weightOnBit: number;
    // ROP
    rateOfPenetration: number

    constructor(
        holeDepth: number,
        rotaryRPM: number,
        differentialPressure: number,
        pumpOutput: number,
        weightOnBit: number,
        rotaryTorque: number,
        standpipePressure: number,
        flow: number,
        rop: number
    ){
        this.holeDepth = holeDepth;
        this.rotaryRPM = rotaryRPM;
        this.differentialPressure = differentialPressure;
        this.pumpOutput = pumpOutput;
        this.weightOnBit = weightOnBit;
        this.rotaryTorque = rotaryTorque;
        this.standpipePressure = standpipePressure;
        this.flow = flow;
        this.rateOfPenetration = rop;
    }
}