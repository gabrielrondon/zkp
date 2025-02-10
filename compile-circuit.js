import { execSync } from 'child_process';
import * as snarkjs from 'snarkjs';
import fs from 'fs';

async function main() {
  try {
    // Compile the circuit
    console.log('Compiling circuit...');
    execSync('circom circuits/object_properties.circom --r1cs --wasm --sym');

    // Generate zKey
    console.log('Generating zKey...');
    const entropy = await snarkjs.zKey.newZKey(
      "object_properties.r1cs",
      "pot12_final.ptau",
      "object_properties.zkey",
      console.log
    );

    // Export verification key
    console.log('Exporting verification key...');
    const vKey = await snarkjs.zKey.exportVerificationKey("object_properties.zkey");
    fs.writeFileSync(
      "public/circuits/verification_key.json",
      JSON.stringify(vKey, null, 2)
    );

    console.log('Circuit compilation and setup complete!');
  } catch (error) {
    console.error('Error during circuit compilation:', error);
    process.exit(1);
  }
}

main().catch(console.error);