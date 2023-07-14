import { useState } from "react";
import OpportunityEditor from "./components/OpportunityEditor";
import Form from "./components/Form";
import { Tabs, Tab } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Button } from "@mui/material";

const App = () => {
    const [formData, setFormData] = useState({
        opportunity_type: "",
        title: "",
        organisation: "",
        whatDoYouNeedHelpWith: "",
        whatDoYouAlreadyHaveInPlace: "",
        whatDoYouAimToAchieve: [""],
        skill: "",
        secondarySkills: [""],
        experience: "",
        open_to_students: false,
        number_of_volunteers: "",
        location: "",
        cause: "",
        deadline: "",
        user: "",
    });
    const [content, setContent] = useState({
        image: "",
        opportunityContent: "<em>Start writing!</em>",
        linkedIn: "",
    });

    const [currentTab, setCurrentTab] = useState("1");
    const [performAction, setPerformAction] = useState(false);

    const handleTabChange = (event, newValue) => {
        setPerformAction(true);
        setTimeout(() => {
            setCurrentTab(newValue);
            setPerformAction(false); // Reset the flag after the action is completed
        }, 100); // Delayed update to wait for 500ms after the action is completed
    };

    return (
        <>
            <span style={{ display: "flex", alignItems: "center" }}>
                <img src={process.env.PUBLIC_URL + "/assets/GAI logo.png"} height={50} alt="Switch Icon" />
                <h2 style={{ fontFamily: "Jaldi, Arial", paddingLeft: "20px" }}>Goodsted AI</h2>
                <h1 style={{ fontFamily: "Jaldi, Arial", paddingLeft: "20px" }}>Opportunity Creation Assitance</h1>
            </span>

            <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={currentTab} onChange={handleTabChange}>
                        <Tab label="Creator" value="1" />
                        <Tab label="Editor" value="2" />
                        <Tab label="Reviewer" value="3" />
                    </Tabs>
                </Box>
                <TabPanel style={{ padding: 0, alignContent: "center" }} value="1" index={0}>
                    <Form
                        opportunityContent={content.opportunityContent}
                        setOpportunityContent={(new_opportunityContent) => {
                            setContent({ ...content, opportunityContent: new_opportunityContent });
                        }}
                        performAction={performAction}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </TabPanel>
                <TabPanel style={{ padding: 0 }} value="2" index={1}>
                    <OpportunityEditor
                        opportunityContent={content.opportunityContent}
                        setOpportunityContent={(new_opportunityContent) => {
                            setContent({ ...content, opportunityContent: new_opportunityContent });
                        }}
                        performAction={performAction}
                    />
                </TabPanel>
                <TabPanel style={{ padding: 0 }} value="3" index={2}>
                    Coming soon, wait for my video tomorrow 😉
                </TabPanel>
            </TabContext>
        </>
    );
};

export default App;
