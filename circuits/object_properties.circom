pragma circom 2.1.4;

// Include standard circomlib gates
include "../node_modules/circomlib/circuits/comparators.circom";
include "../node_modules/circomlib/circuits/gates.circom";

template ObjectProperties() {
    // Input signals
    signal input color; // 0 for red, 1 for blue
    signal input size;  // 0 for large, 1 for small
    signal input shape; // 0 for square, 1 for circle
    signal input texture; // 0 for rough, 1 for smooth
    
    // Query signals
    signal input queryType; // 0: color, 1: size, 2: shape, 3: texture
    signal input queryValue; // Expected value for the query
    
    // Output signal
    signal output isValid;
    
    // Components
    component colorEq = IsEqual();
    component sizeEq = IsEqual();
    component shapeEq = IsEqual();
    component textureEq = IsEqual();
    
    // Color check
    colorEq.in[0] <== color;
    colorEq.in[1] <== queryValue;
    
    // Size check
    sizeEq.in[0] <== size;
    sizeEq.in[1] <== queryValue;
    
    // Shape check
    shapeEq.in[0] <== shape;
    shapeEq.in[1] <== queryValue;
    
    // Texture check
    textureEq.in[0] <== texture;
    textureEq.in[1] <== queryValue;
    
    // Multiplexer for selecting the correct comparison based on queryType
    component mux = Multiplexer(4,1);
    mux.inp[0] <== colorEq.out;
    mux.inp[1] <== sizeEq.out;
    mux.inp[2] <== shapeEq.out;
    mux.inp[3] <== textureEq.out;
    mux.sel <== queryType;
    
    isValid <== mux.out;
}