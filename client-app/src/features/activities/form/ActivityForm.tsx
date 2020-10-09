import React, { FormEvent, useContext, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";


interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity, editActivity, submitting, cancelFormOpen} = activityStore
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);
  
  const handleSubmit = () => {
      if(activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid()
        }
        createActivity(newActivity);
      }
      else {
        editActivity(activity);
      }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          value={activity.title}
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          value={activity.description!}
          placeholder="Description"
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.category}
          placeholder="Category"
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          value={activity.date}
          placeholder="Date"
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.city}
          placeholder="City"
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.venue}
          placeholder="Venue"
          name="venue"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" loading={submitting} />
        <Button
          onClick={cancelFormOpen}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);