declare module 'memoryjs' {
  type Handle = number;

  export interface Process {
    handle: Handle;
    modBaseAddr: bigint;
    szExeFile: string;
    th32ProcessID: number;
  }

  export interface Module {
    handle: Handle;
    th32ProcessID: number;
    modBaseAddr: bigint;
    modBaseSize: number;
    szModule: string;
    szExeFile: string;
  }

  export interface Region {
    BaseAddress: bigint;
    AllocationBase: number;
    AllocationProtect: number;
    RegionSize: number;
    State: number;
    Protect: number;
    Type: number;
  }

  type FindPatternCallback = (error: Error | undefined, address: number) => void;

  interface MemoryJS {
    NORMAL: number; // 0
    READ: number; // 0
    SUBTRACT: number;
    STRING: string;
    INT: string;
    BYTE: string;
    INT32: string;
    INT64: string;
    UINT: string;
    UINT16: string;
    UINT32: string;
    UINT64: string;
    FLOAT: string;
    POINTER: string;
    DWORD: string;
    VEC3: string;
    PAGE_NOACCESS: number;
    PAGE_READONLY: number;
    PAGE_READWRITE: number;
    PAGE_WRITECOPY: number;
    PAGE_EXECUTE: number;
    PAGE_EXECUTE_READ: number;
    PAGE_EXECUTE_READWRITE: number;
    PAGE_EXECUTE_WRITECOPY: number;
    PAGE_GUARD: number;
    PAGE_NOCACHE: number;
    PAGE_WRITECOMBINE: number;
    PAGE_ENCLAVE_UNVALIDATED: number;
    PAGE_TARGETS_NO_UPDATE: number;
    PAGE_TARGETS_INVALID: number;
    PAGE_ENCLAVE_THREAD_CONTROL: number;
    MEM_COMMIT: number;
    MEM_RESERVE: number;
    MEM_RESET: number;
    MEM_TOP_DOWN: number;
    MEM_RESET_UNDO: number;
    MEM_LARGE_PAGES: number;
    MEM_PHYSICAL: number;
    MEM_PRIVATE: number;
    MEM_MAPPED: number;
    MEM_IMAGE: number;
    openProcess: (processName: string | number) => Process;
    closeProcess: (handle: Handle) => void;
    findPattern(handle: Handle, moduleName: string, signature: string, signatureType: number, patternOffset: number, addressOffset: number): number;
    findPattern(handle: Handle, moduleName: string, signature: string, signatureType: number, patternOffset: number, addressOffset: number, callback: FindPatternCallback): void;
    findPattern(handle: Handle, moduleName: string, signature: string, signatureType: number, patternOffset: number, addressOffset: number, callback: FindPatternCallback): void;
    readBuffer(handle: Handle, structAddress: number, length: number): Buffer;
    writeBuffer(handle: Handle, structAddress: number, buffer: Buffer): void;
    readMemory<T>(handle: Handle, address: number, type: string): T;
    readUINT64(handle: Handle, address: number): number;
    readBigInt(handle: Handle, address: number): number;
    readByte(handle: Handle, address: number): number;
    writeMemory(handle: Handle, address: number, value: unknown, type: string): void;
    getModules(th32ProcessID: number): Module[];
    getRegions(handle: Handle): Region[];
    getProcesses(): Process[];

    virtualProtectEx(handle: Handle, address: number, size: number, protection: number): number;
  }

  const memoryjs: MemoryJS;
  export default memoryjs;
}