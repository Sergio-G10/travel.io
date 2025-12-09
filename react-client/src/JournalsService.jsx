import axios from 'axios';

const JOURNALS_API_BASE_URL = "http://localhost:3000/journals";
const UPLOAD_API_BASE_URL = "http://localhost:3000/upload";

class JournalsService {
  getJournals() {
    console.log("JournalsService: getJournals called");
    return axios.get(JOURNALS_API_BASE_URL + "/", { withCredentials: true });
  }

  createJournal(journal) {
    return axios.post(JOURNALS_API_BASE_URL + "/", journal, { withCredentials: true });
  }

  getJournalById(id) {
    return axios.get(`${JOURNALS_API_BASE_URL}/${id}`, { withCredentials: true });
  }

  deleteJournal(id) {
    return axios.delete(`${JOURNALS_API_BASE_URL}/${id}`, { withCredentials: true });
  }

  editJournal(id, journal) {
    return axios.put(`${JOURNALS_API_BASE_URL}/${id}`, journal, { withCredentials: true });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(UPLOAD_API_BASE_URL + "/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new JournalsService();