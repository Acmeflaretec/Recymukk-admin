import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Notification() {
  return (
    <PageLayout
      title={'Notification'}
      action={
        <Button component={Link} to={`/notification/addNotification`}>Add Notification</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Notification;
