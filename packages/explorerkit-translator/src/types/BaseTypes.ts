import * as BufferLayout from "@solana/buffer-layout";

// Default InstructionData return type for all parsers
export type InstructionData<T> = {
  instructionName?: string;
  data?: T;
};

export type InstructionLayout<T, V> = {
  // T refers to the Instruction Enums
  instructionType: T;
  // V refers to the Instruction Layout consturcted by buffer layout
  instructionLayout: BufferLayout.Layout<V>;
};
