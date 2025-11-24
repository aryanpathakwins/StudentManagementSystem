import { type ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDrawerOpen,
  setShowSubjectInput,
  updateFormField,
  addOrUpdateSubject,
  editSubject,
  removeSubject,
  openNewForm,
  openEditForm,
  resetForm,
} from "./studentSlice";

import {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useClearAllStudentsMutation,
} from "./Student/studentApi";

import type { RootState } from "./Redux/store";

import {
  Button,
  Drawer,
  Input,
  List,
  Typography,
  Space,
  Popconfirm,
  message,
  Card,
  Spin,
  Empty,
} from "antd";

const { Title, Text } = Typography;

function StudentInteraction() {
  const dispatch = useDispatch();
  const { form, drawerOpen, showSubjectInput } = useSelector(
    (state: RootState) => state.students
  );

  
  const { data: students = [], isLoading, isError } = useGetStudentsQuery();
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [clearAllStudents] = useClearAllStudentsMutation();

  const handleInputs = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    dispatch(updateFormField({ name, value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return message.error("Please enter Name");
    if (!form.className.name.trim())
      return message.error("Please enter Class Name");

    const studentData = {
      name: form.name,
      className: { ...form.className },
      subjects: [...form.subjects],
    };

    try {
      if (form.id) {
        await updateStudent({ id: form.id as number, ...studentData }).unwrap();
        message.success("Student updated successfully");
      } else {
        await addStudent(studentData).unwrap();
        message.success("Student added successfully");
      }

      dispatch(resetForm());
      dispatch(setDrawerOpen(false));
    } catch {
      message.error("Failed to save student");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id).unwrap();
      message.success("Student deleted");
    } catch {
      message.error("Failed to delete student");
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllStudents().unwrap();
      message.success("All students cleared");
    } catch {
      message.error("Failed to clear students");
    }
  };

  if (isLoading) {
    return (
      <div className="ml-64 p-6">
        <Spin tip="Loading students..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="ml-64 p-6">
        <Text type="danger">
          Error loading students. Make sure JSON Server is running.
        </Text>
      </div>
    );
  }

  return (
    <div className="ml-64 p-6">
      <div className="flex items-center justify-between mb-5">
        <Title level={2}>Students</Title>

        <Space>
          <Button type="primary" onClick={() => dispatch(openNewForm())}>
            Open Form
          </Button>

          <Popconfirm
            title="Clear ALL saved students?"
            onConfirm={handleClearAll}
          >
            <Button danger>Clear All</Button>
          </Popconfirm>
        </Space>
      </div>

      {students.length === 0 ? (
        <Empty description="No students added yet" />
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={students}
          renderItem={(st) => (
            <List.Item>
              <Card
                title={st.name}
                extra={
                  <Space>
                    <Button
                      size="small"
                      onClick={() =>
                        dispatch(
                          openEditForm({
                            ...st,
                            id: st.id ?? null,
                            subjectInput: { name: "", id: "" },
                          })
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Popconfirm
                      title="Delete this student?"
                      onConfirm={() => handleDelete(st.id!)}
                    >
                      <Button size="small" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                }
              >
                <p>
                  <Text strong>Class:</Text> {st.className?.name || "-"}
                </p>

                <p className="mt-2">
                  <Text strong>Subjects:</Text>
                </p>

                {st.subjects.length > 0 ? (
                  <ul style={{ marginLeft: 20 }}>
                    {st.subjects.map((s) => (
                      <li key={s.id}>{s.name}</li>
                    ))}
                  </ul>
                ) : (
                  <Text type="secondary">No subjects</Text>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}

      
      <Drawer
        title={form.id ? "Edit Student" : "New Student"}
        open={drawerOpen}
        width={420}
        onClose={() => {
          dispatch(setDrawerOpen(false));
          dispatch(resetForm());
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          
          <div>
            <Text strong>Name</Text>
            <Input
              name="name"
              value={form.name}
              onChange={handleInputs}
              placeholder="Enter Name"
            />
          </div>

          
          <div>
            <Text strong>Class Name</Text>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                name="className"
                value={form.className.name}
                onChange={handleInputs}
                placeholder="Class Name"
              />
              <Button
                onClick={() => {
                  if (!form.className.name.trim())
                    return message.error("Fill Class Name first");
                  dispatch(setShowSubjectInput(!showSubjectInput));
                }}
                type="primary"
              >
                +
              </Button>
            </Space.Compact>
          </div>

          
          {showSubjectInput && (
            <div style={{ background: "#fafafa", padding: 12, borderRadius: 6 }}>
              <Text strong>Subject</Text>

              <Space.Compact style={{ width: "100%", marginTop: 8 }}>
                <Input
                  name="subjectName"
                  value={form.subjectInput.name}
                  onChange={handleInputs}
                  placeholder="Subject name"
                />
                <Button type="primary" onClick={() => dispatch(addOrUpdateSubject())}>
                  {form.subjectInput.id ? "Update" : "Add"}
                </Button>
              </Space.Compact>

              
              {form.subjects.length > 0 && (
                <List
                  style={{ marginTop: 12 }}
                  dataSource={form.subjects}
                  renderItem={(s) => (
                    <List.Item
                      actions={[
                        <Button
                          size="small"
                          onClick={() => dispatch(editSubject(s))}
                        >
                          Edit
                        </Button>,
                        <Button
                          size="small"
                          danger
                          onClick={() => dispatch(removeSubject(s.id))}
                        >
                          Remove
                        </Button>,
                      ]}
                    >
                      {s.name}
                    </List.Item>
                  )}
                />
              )}
            </div>
          )}

          
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              {form.id ? "Update" : "Submit"}
            </Button>

            <Button
              onClick={() => {
                dispatch(resetForm());
                dispatch(setDrawerOpen(false));
              }}
            >
              Clear
            </Button>
          </Space>
        </Space>
      </Drawer>
    </div>
  );
}

export default StudentInteraction;
