import { createAction } from "@reduxjs/toolkit";

export const tickAction = createAction<void, 'tick'>('tick');
