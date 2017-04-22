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
}