import { createGenericContext } from "../../utils/GenericContext";

const activeItemContext = createGenericContext(-1);

export const ActiveItemContext = activeItemContext.Context;
export const useActiveItem = activeItemContext.use;
export const ActiveItemProvider = activeItemContext.Provider;
