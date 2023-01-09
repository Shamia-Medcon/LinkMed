import AxiosApi from "./AxiosApi";
import routerAPI from "./routerAPI";

export default class {
    static async InitApp() {

    }
    //////////////Registration Routes//////////////
    //-----------
    //Login Function
    //--------------------
    static async LoginFunction(data) {
        return await AxiosApi.post(routerAPI._loginRoute, data);
    }
    //-----------
    //Register Function
    //--------------------
    static async RegisterFunction(data) {
        return AxiosApi.post(routerAPI._registerRoute, data);
    }
    //-----------
    //Event Function
    //--------------------
    static async EventList(data) {
        return AxiosApi.get(routerAPI._eventRoute, data);
    }
    //-----------
    //Event Faculty Function
    //--------------------
    static async EventSpeakerList(id) {
        return AxiosApi.get(routerAPI._eventSpeakerRoute + "/" + id);
    }
    //-----------
    //Event Agenda Function
    //--------------------
    static async EventAgendaList(data, id) {
        return AxiosApi.get(routerAPI._eventAgendaRoute + "/" + id, data);
    }
    //-----------
    //Event Question Function
    //--------------------
    static async EventQuestionByUser(data, id) {
        return AxiosApi.get(routerAPI._eventQuestionByUser + "/" + id, data);
    }
    //-----------
    //Send Question Function
    //--------------------
    static async PostEventQuestionByUser(data) {
        return AxiosApi.post(routerAPI._eventQuestionByUser, data);
    }
    //-----------
    //Event Polling Question Function
    //--------------------
    static async EventPolling(id) {
        return AxiosApi.get(routerAPI._eventPollingRoute + "/" + id);
    }
    //-----------
    //Event Feedback Evaluation Function
    //--------------------
    static async EventFeedbackEvaluation(id) {
        return AxiosApi.get(routerAPI._eventFeedbackEvaluation + "/" + id);
    }
    //-----------
    //Post Event Feedback Evaluation Answers Function
    //--------------------
    static async EventFeedbackEvaluationUserAnswer(data) { 
        return AxiosApi.post(routerAPI._eventFeedbackEvaluationUserAnswer, data);
    }


}