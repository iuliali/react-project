import { AbsoluteCenter,  VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addPage } from "../store/journals.reducer";
import JournalPageDisplay from "../components/JournalPageDisplay";
import { useParams } from "react-router-dom";
import CreateJournalPageForm from "../components/CreateJournalPageForm";

const JournalPage = (props) => {
    const edit = props.edit;
    const params = useParams();
    const pageId = params.pageId;
    const journalId = params.journalId;
    const page = useSelector((state) => (state.journals.pages && state.journals.pages[journalId].find((page) => page.id === pageId)) ?? {});
    const pagesColRef = collection(db, `journals/${journalId}/pages`);
    const dispatch = useDispatch();
    console.log(edit, pageId, journalId, page);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const pageSnapshot = await getDoc(pagesColRef, pageId);
                if (pageSnapshot.exists) {
                    const pageData = pageSnapshot.data();
                    console.log(pageData);
                    dispatch(addPage({id: journalId, page: pageData}));
                } else {
                    // Page not found
                }
            } catch (error) {
                // Handle error
            }
        };
        if(page == {}){
            fetchPageData();
        }
    }, []);

    return (
        <AbsoluteCenter p={4} minH="50vh" minW="60vw">
                {!edit && <JournalPageDisplay page={page} journalId={journalId} inJournal={false}/>}
                {edit && <CreateJournalPageForm journalId={journalId} page={page} edit={true}/>}
        </AbsoluteCenter>
    );
}

export default JournalPage;
