import axios from 'axios';

const JOURNALS_API_BASE_URL = "http://localhost:3000/journals";

class JournalsService {
  getJournals() {
    return axios.get(JOURNALS_API_BASE_URL + "/");
  }

  createJournal(journal) {
    return axios.post(JOURNALS_API_BASE_URL + "/", journal);
  }

  getJournalById(id) {
    return axios.get(`${JOURNALS_API_BASE_URL}/${id}`);
  }

  deleteJournal(id) {
    return axios.delete(`${JOURNALS_API_BASE_URL}/${id}`);
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