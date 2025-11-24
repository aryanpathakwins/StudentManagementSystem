import { useDispatch, useSelector } from "react-redux";
import {
  setDrawerOpen,
  openNewPhoneForm,
  openEditPhoneForm,
  type PhonesState,
  type PhoneEntry,
} from "../Redux/phoneSlice";

import {
  useGetPhonesQuery as useGetPhoneModelsQuery,
} from "../ReduxAPI/apislice";

import {
  useGetPhonesQuery,
  useAddPhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,
} from "../Phone/phoneApi";

import { useGetStudentsQuery } from "../Student/studentApi";

import {
  Button,
  Drawer,
  Table,
  Card,
  Empty,
  Select,
  Form,
  Input,
  message,
} from "antd";

const { Option } = Select;

interface RootState {
  phones: PhonesState;
}

function Phones() {
  const dispatch = useDispatch();
  const [formInstance] = Form.useForm();

  const { drawerOpen, form } = useSelector(
    (state: RootState) => state.phones
  );

  const { data: phoneEntries = [] } = useGetPhonesQuery();
  const { data: students = [], isLoading: studentsLoading } =
    useGetStudentsQuery();
  const { data: phoneModels = [] } = useGetPhoneModelsQuery();

  const [addPhone] = useAddPhoneMutation();
  const [updatePhone] = useUpdatePhoneMutation();
  const [deletePhone] = useDeletePhoneMutation();

  const toggleDrawer = () => {
    if (drawerOpen) {
      dispatch(setDrawerOpen(false));
    } else {
      dispatch(openNewPhoneForm());
    }
  };

  
  const handleSubmit = async (values: any) => {
    try {
      if (form.id) {
        await updatePhone({
          id: form.id,
          studentName: values.studentName,
          phone: values.phone,
          issueDate: values.issueDate,
        }).unwrap();
        message.success("Phone updated!");
      } else {
        await addPhone(values).unwrap();
        message.success("Phone added!");
      }

      dispatch(setDrawerOpen(false));
      dispatch(openNewPhoneForm());
      formInstance.resetFields();
    } catch (err) {
      message.error("Failed to save phone!");
    }
  };

  const handleEdit = (entry: PhoneEntry) => {
    dispatch(openEditPhoneForm(entry));
    formInstance.setFieldsValue(entry);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;

    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await deletePhone(id).unwrap();
      message.success("Phone deleted");
    } catch {
      message.error("Delete failed");
    }
  };

  
  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, entry: PhoneEntry) => (
        <>
          <Button type="link" onClick={() => handleEdit(entry)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => handleDelete(entry.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Phone Management</h1>
        </div>

        
        <Button
          type="primary"
          style={{ marginBottom: 20 }}
          onClick={toggleDrawer}
        >
          + Add Phone
        </Button>

        
        {phoneEntries.length === 0 ? (
          <Card className="shadow">
            <Empty
              description="No phones added yet. Click Add Phone."
            />
          </Card>
        ) : (
          <Card className="shadow">
            <Table
              dataSource={phoneEntries}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        )}
      </div>

      <Drawer
        title={form.id ? "Edit Phone" : "Add Phone"}
        open={drawerOpen}
        onClose={toggleDrawer}
        width={380}
      >
        <Form
          form={formInstance}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={form}
        >
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select student">
              {studentsLoading && (
                <Option value="" disabled>
                  Loading...
                </Option>
              )}
              {students.map((s: any) => (
                <Option key={s.id} value={s.name}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          
          <Form.Item
            label="Phone Model"
            name="phone"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select phone">
              {phoneModels.map((m: any) => (
                <Option key={m.id} value={m.name}>
                  {m.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Issue Date"
            name="issueDate"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {form.id ? "Update Phone" : "Submit Phone"}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default Phones;
