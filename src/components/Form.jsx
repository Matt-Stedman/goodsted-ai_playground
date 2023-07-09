import React, { useState } from "react";
import { Button, Grid, Checkbox, FormControlLabel, TextField, Box, MenuItem } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { createOpportunityFromForm } from "../functions/OpenAi";
import WhatDoYouNeedHelpWith from "./Form/WhatDoYouNeedHelpWith";
import AboutActivity from "./Form/AboutActivity";
import AboutSupporters from "./Form/AboutSupporters";

const Form = (props) => {
    const [currentTab, setCurrentTab] = useState("1");
    const [performAction, setPerformAction] = useState(false);

    /**
     * Handle the changing of form data
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Handle the submitting of the form
     */
    const handleSubmit = async () => {
        // Do something with the form data
        console.log(props.formData);
        await createOpportunityFromForm(props.formData).then((content) => {
            props.setOpportunityContent(content);
            console.log("Opportunity Content set to: ", content);
        });
    };

    const AIEnhance = () => {};

    /**
     * Handle the changing of tabs
     */
    const handleTabChange = (event, newValue) => {
        setPerformAction(true);
        setTimeout(() => {
            setCurrentTab(newValue);
            setPerformAction(false); // Reset the flag after the action is completed
        }, 100); // Delayed update to wait for 500ms after the action is completed
    };

    return (
        <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="What do you need help with?" value="1" />
                    <Tab label="About Activity" value="2" />
                    <Tab label="About supporters" value="3" />
                </Tabs>
            </Box>
            <TabPanel style={{ padding: 10, display: "flex", justifyContent: "center" }} value="1">
                <WhatDoYouNeedHelpWith
                    formData={props.formData}
                    handleChange={handleChange}
                    handleTabChange={handleTabChange}
                    myButton={
                        <Button
                            variant="contained"
                            onClick={() => {
                                props.handleTabChange(null, "2");
                            }}
                            style={{ float: "right" }}
                        >
                            Next
                        </Button>
                    }
                />
            </TabPanel>
            <TabPanel style={{ padding: 10, display: "flex", justifyContent: "center" }} value="2">
                <AboutActivity
                    formData={props.formData}
                    handleChange={handleChange}
                    handleTabChange={handleTabChange}
                    myButton={
                        <Button
                            variant="contained"
                            onClick={() => {
                                props.handleTabChange(null, "3");
                            }}
                            style={{ float: "right" }}
                        >
                            Next
                        </Button>
                    }
                />
            </TabPanel>
            <TabPanel style={{ padding: 10, display: "flex", justifyContent: "center" }} value="3">
                <AboutSupporters
                    formData={props.formData}
                    handleChange={handleChange}
                    handleTabChange={handleTabChange}
                    myButton={
                        <Button variant="contained" onClick={handleSubmit} style={{ float: "right" }}>
                            Submit
                        </Button>
                    }
                />
            </TabPanel>
        </TabContext>
    );
};

export default Form;
