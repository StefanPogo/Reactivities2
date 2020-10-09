import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import  ActivityDetails  from "../details/ActivityDetails";
import  ActivityForm  from "../form/ActivityForm";
import  ActivityList  from "./ActivityList";
import {observer} from 'mobx-react-lite'
import ActivityStore from "../../../app/stores/activityStore";
interface IProps {
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const ActivityDashBoard: React.FC<IProps> = ({
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const {editMode, selectedActivity} = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          target={target}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width={6}>   
        {selectedActivity && !editMode && (
          <ActivityDetails
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashBoard)