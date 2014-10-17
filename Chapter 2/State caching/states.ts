 export class _DepthCullingState {
        private _isDepthTestDirty = false;
        private _isDepthMaskDirty = false;
        private _isDepthFuncDirty = false;
        private _isCullFaceDirty = false;
        private _isCullDirty = false;

        private _depthTest: boolean;
        private _depthMask: boolean;
        private _depthFunc: number;
        private _cull: boolean;
        private _cullFace: number;
        

        public get isDirty(): boolean {
            return this._isDepthTestDirty || this._isDepthMaskDirty || this._isCullFaceDirty || this._isCullDirty;
        }

        public get cullFace(): number {
            return this._cullFace;
        }

        public set cullFace(value: number) {
            if (this._cullFace === value) {
                return;
            }

            this._cullFace = value;
            this._isCullFaceDirty = true;
        }

        public get cull() {
            return this._cull;
        }

        public set cull(value: boolean) {
            if (this._cull === value) {
                return;
            }

            this._cull = value;
            this._isCullDirty = true;
        }

        public get depthFunc(): number {
            return this._depthFunc;
        }

        public set depthFunc(value: number) {
            if (this._depthFunc === value) {
                return;
            }

            this._depthFunc = value;
            this._isDepthFuncDirty = true;
        }

        public get depthMask(): boolean {
            return this._depthMask;
        }

        public set depthMask(value: boolean) {
            if (this._depthMask === value) {
                return;
            }

            this._depthMask = value;
            this._isDepthMaskDirty = true;
        }

        public get depthTest(): boolean {
            return this._depthTest;
        }

        public set depthTest(value: boolean) {
            if (this._depthTest === value) {
                return;
            }

            this._depthTest = value;
            this._isDepthTestDirty = true;
        }

        public reset() {
            this._depthMask = true;
            this._depthTest = true;
            this._depthFunc = null;
            this._cull = null;
            this._cullFace = null;

            this._isDepthTestDirty = true;
            this._isDepthMaskDirty = true;
            this._isDepthFuncDirty = false;
            this._isCullFaceDirty = false;
            this._isCullDirty = false;
        }

        public apply(gl: WebGLRenderingContext) {

            if (!this.isDirty) {
                return;
            }

            // Cull
            if (this._isCullDirty) {
                if (this.cull === true) {
                    gl.enable(gl.CULL_FACE);
                } else if (this.cull === false) {
                    gl.disable(gl.CULL_FACE);
                }

                this._isCullDirty = false;
            }

            // Cull face
            if (this._isCullFaceDirty) {
                gl.cullFace(this.cullFace);
                this._isCullFaceDirty = false;
            }

            // Depth mask
            if (this._isDepthMaskDirty) {
                gl.depthMask(this.depthMask);
                this._isDepthMaskDirty = false;
            }

            // Depth test
            if (this._isDepthTestDirty) {
                if (this.depthTest === true) {
                    gl.enable(gl.DEPTH_TEST);
                } else if (this.depthTest === false) {
                    gl.disable(gl.DEPTH_TEST);
                }
                this._isDepthTestDirty = false;
            }

            // Depth func
            if (this._isDepthFuncDirty) {
                gl.depthFunc(this.depthFunc);
                this._isDepthFuncDirty = false;
            }
        }
    }

    export class _AlphaState {
        private _isAlphaBlendDirty = false;
        private _isBlendFunctionParametersDirty = false;
        private _alphaBlend = false;
        private _blendFunctionParameters = new Array<number>(4);

        public get isDirty(): boolean {
            return this._isAlphaBlendDirty || this._isBlendFunctionParametersDirty;
        }

        public get alphaBlend(): boolean {
            return this._alphaBlend;
        }

        public set alphaBlend(value: boolean) {
            if (this._alphaBlend === value) {
                return;
            }

            this._alphaBlend = value;
            this._isAlphaBlendDirty = true;
        }

        public setAlphaBlendFunctionParameters(value0: number, value1: number, value2: number, value3: number): void {
            if (
                this._blendFunctionParameters[0] === value0 &&
                this._blendFunctionParameters[1] === value1 &&
                this._blendFunctionParameters[2] === value2 &&
                this._blendFunctionParameters[3] === value3
            ) {
                return;
            }

            this._blendFunctionParameters[0] = value0;                
            this._blendFunctionParameters[1] = value1;                
            this._blendFunctionParameters[2] = value2;                
            this._blendFunctionParameters[3] = value3;                

            this._isBlendFunctionParametersDirty = true;
        }

        public reset() {
            this._alphaBlend = false;
            this._blendFunctionParameters[0] = null;
            this._blendFunctionParameters[1] = null;
            this._blendFunctionParameters[2] = null;
            this._blendFunctionParameters[3] = null;   

            this._isAlphaBlendDirty = true;
            this._isBlendFunctionParametersDirty = false;
        }

        public apply(gl: WebGLRenderingContext) {

            if (!this.isDirty) {
                return;
            }

            // Alpha blend
            if (this._isAlphaBlendDirty) {
                if (this._alphaBlend === true) {
                    gl.enable(gl.BLEND);
                } else if (this._alphaBlend === false) {
                    gl.disable(gl.BLEND);
                }

                this._isAlphaBlendDirty = false;
            }

            // Alpha function
            if (this._isBlendFunctionParametersDirty) {
                gl.blendFuncSeparate(this._blendFunctionParameters[0], this._blendFunctionParameters[1], this._blendFunctionParameters[2], this._blendFunctionParameters[3]);
                this._isBlendFunctionParametersDirty = false;
            }
        }
    }