import { createSlice } from "@reduxjs/toolkit"

const initialState = {
        productCollectionType: localStorage.getItem("CollectionType") ? JSON.parse(localStorage.getItem("CollectionType")) : "Grid",
        appNotification: {
                status: false,
                message: "",
                type: ""
        },
        categories: localStorage.getItem("Categories") ? JSON.parse(localStorage.getItem("Categories")) : null,
        editModal: { status: false, data: null},
        deleteModal: { status: false, category_name: ""},
        variations: localStorage.getItem("Variations") ? JSON.parse(localStorage.getItem("Variations")) : null,
        editVariationModal: { status: false, data: null },
        deleteVariationModal: { status: false, id: ""},
        productModal: { status: true }
}

const utilSlice = createSlice({
       name: "utils",
       initialState,
       reducers: {
              setProductCollectionType: (state, action) => {
                    state.productCollectionType = action.payload;
                    localStorage.setItem("CollectionType", JSON.stringify(action.payload))
              },
             setAppNotification: (state, action) => {
                     state.appNotification.status = action.payload.status;
                     state.appNotification.message = action.payload.message;
                     state.appNotification.type = action.payload.type;
             },
             removeAppNotification: (state) => {
                     state.appNotification.status = false;
             },
             setCategories: (state, action) => {
                    state.categories = action.payload;
                    localStorage.setItem("Categories", JSON.stringify(action.payload))
             },
            clearCategories: (state) => {
                   state.categories = null;
                   localStorage.removeItem("Categories")
            },
            openEditModal: (state, action) => {
                    state.editModal.status = true;
                    state.editModal.data = action.payload
            },
            closeEditModal: (state) => {
                   state.editModal.status = false;
                   state.editModal.data = null
            },
            openDeleteModal: (state, action) => {
                   state.deleteModal.status = true;
                   state.deleteModal.category_name = action.payload
            },
            closeDeleteModal: (state) => {
                   state.deleteModal.status = false;
                   state.deleteModal.category_name = ""
            },
            setVariations: (state, action) => {
                   state.variations = action.payload;
                   localStorage.setItem("Variations", JSON.stringify(action.payload))
            },
            openVariationEditModal: (state, action) => {
                   state.editVariationModal.status = true;
                   state.editVariationModal.data = action.payload
            },
            closeVariationEditModal: (state) => {
                     state.editVariationModal.status = false;
                     state.editVariationModal.data = null
            },
            openDeleteVariationModal: (state, action) => {
                    state.deleteVariationModal.status = true;
                    state.deleteVariationModal.id = action.payload
            },
            closeDeleteVariationModal: (state) => {
                   state.deleteVariationModal.status = false;
                   state.deleteVariationModal.id = ""
            },

            //open create product modal
            openCreateProductModal: (state) => {
                   state.productModal.status = true
            },

            //close product modal
            closeCreateProductModal: (state) => {
                  state.productModal.status = false
            }
       }
})

export const {
       setProductCollectionType,
       setAppNotification,
       removeAppNotification,
       setCategories,
       clearCategories,
       openEditModal,
       closeEditModal,
       openDeleteModal,
       closeDeleteModal,
       setVariations,
       openVariationEditModal,
       closeVariationEditModal,
       openDeleteVariationModal,
       closeDeleteVariationModal,
       openCreateProductModal,
       closeCreateProductModal
} = utilSlice.actions;

export default utilSlice.reducer;