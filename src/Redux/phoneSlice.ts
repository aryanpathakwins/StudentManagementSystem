import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PhoneEntry {
  id?: number;
  studentName: string;
  phone: string;
  issueDate: string;
}

export interface PhonesState {
  drawerOpen: boolean;
  form: {
    id: number | null;
    studentName: string;
    phone: string;
    issueDate: string;
  };
  phoneEntries: PhoneEntry[];
}

const initialState: PhonesState = {
  drawerOpen: false,
  form: {
    id: null,
    studentName: "",
    phone: "",
    issueDate: "",
  },
  phoneEntries: [],
};

const phoneSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },

    
    updateFormField(
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) {
      const { name, value } = action.payload;
      if (name in state.form) {
        (state.form as any)[name] = value;
      }
    },

    
    openNewPhoneForm(state) {
      state.form = {
        id: null,
        studentName: "",
        phone: "",
        issueDate: "",
      };
      state.drawerOpen = true;
    },

    
    openEditPhoneForm(state, action: PayloadAction<PhoneEntry>) {
      state.form = { 
        id: action.payload.id ?? null,
        studentName: action.payload.studentName,
        phone: action.payload.phone,
        issueDate: action.payload.issueDate,
      };
      state.drawerOpen = true;
    },

    
    submitPhoneForm(state) {
      if (state.form.id) {
        state.phoneEntries = state.phoneEntries.map((item) =>
          item.id === state.form.id 
            ? { 
                id: state.form.id,
                studentName: state.form.studentName,
                phone: state.form.phone,
                issueDate: state.form.issueDate,
              } 
            : item
        );
      } else {
        const newEntry: PhoneEntry = {
          id: Date.now(),
          studentName: state.form.studentName,
          phone: state.form.phone,
          issueDate: state.form.issueDate,
        };
        state.phoneEntries.unshift(newEntry);
      }

      state.drawerOpen = false;
      state.form = {
        id: null,
        studentName: "",
        phone: "",
        issueDate: "",
      };
    },


    deletePhoneEntry(state, action: PayloadAction<number>) {
      state.phoneEntries = state.phoneEntries.filter(
        (item) => item.id !== action.payload
      );
    },

    
    loadPhoneEntries(state, action: PayloadAction<PhoneEntry[]>) {
      state.phoneEntries = action.payload;
    },

    clearAllPhoneEntries(state) {
      state.phoneEntries = [];
    },
  },
});

export const {
  setDrawerOpen,
  updateFormField,
  openNewPhoneForm,
  openEditPhoneForm,
  submitPhoneForm,
  deletePhoneEntry,
  loadPhoneEntries,
  clearAllPhoneEntries,
} = phoneSlice.actions;

export default phoneSlice.reducer;