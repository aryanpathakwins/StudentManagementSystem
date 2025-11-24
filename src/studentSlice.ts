import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Subject {
  id: string | number;
  name: string;
}

export interface ClassNameType {
  id: string | number | null;
  name: string;
}

export interface FormState {
  id: string | number | null;
  name: string;
  className: ClassNameType;
  subjectInput: Subject;
  subjects: Subject[];
}

export interface StudentsState {
  form: FormState;
  drawerOpen: boolean;
  showSubjectInput: boolean;
}

const initialState: StudentsState = {
  form: {
    id: null,
    name: "",
    className: { name: "", id: "" },
    subjectInput: { name: "", id: "" },
    subjects: [],
  },
  drawerOpen: false,
  showSubjectInput: false,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },

    setShowSubjectInput(state, action: PayloadAction<boolean>) {
      state.showSubjectInput = action.payload;
    },

    updateFormField(
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) {
      const { name, value } = action.payload;

      if (name === "className") {
        state.form.className.name = value;
      } else if (name === "subjectName") {
        state.form.subjectInput.name = value;
      } else {
        // @ts-ignore dynamic assignment
        state.form[name] = value;
      }
    },

    addOrUpdateSubject(state) {
      const subjectValue = state.form.subjectInput.name.trim();
      if (!subjectValue) return;

      if (state.form.subjectInput.id) {
        state.form.subjects = state.form.subjects.map((s) =>
          s.id === state.form.subjectInput.id ? { ...s, name: subjectValue } : s
        );
      } else {
        const newSubject: Subject = { id: Date.now(), name: subjectValue };
        state.form.subjects.push(newSubject);
      }

      state.form.subjectInput = { name: "", id: "" };
    },

    editSubject(state, action: PayloadAction<Subject>) {
      state.form.subjectInput = { ...action.payload };
      state.showSubjectInput = true;
    },

    removeSubject(state, action: PayloadAction<string | number>) {
      state.form.subjects = state.form.subjects.filter(
        (s) => s.id !== action.payload
      );
    },

    openNewForm(state) {
      state.form = { ...initialState.form, subjects: [] };
      state.showSubjectInput = false;
      state.drawerOpen = true;
    },

    openEditForm(state, action: PayloadAction<FormState>) {
      const student = action.payload;
      state.form = {
        id: student.id,
        name: student.name,
        className: { ...student.className },
        subjectInput: { name: "", id: "" },
        subjects: student.subjects ? [...student.subjects] : [],
      };

      state.showSubjectInput = false;
      state.drawerOpen = true;
    },

    resetForm(state) {
      state.form = { ...initialState.form, subjects: [] };
      state.showSubjectInput = false;
    },
  },
});

export const {
  setDrawerOpen,
  setShowSubjectInput,
  updateFormField,
  addOrUpdateSubject,
  editSubject,
  removeSubject,
  openNewForm,
  openEditForm,
  resetForm,
} = studentSlice.actions;

export default studentSlice.reducer;