import axios from "axios";

const url = "https://app-9f0a1fa0-f478-4848-a93a-b9847d089c72.cleverapps.io"

const getUsers = async () => await (await axios.get(url + "/users/get_users"));

const getGenders = async () => await (await axios.get(url + "/users/get_genders"));

const getRols = async () => await (await axios.get(url + "/users/get_rols"));

const getLanguageLevels = async () => await (await axios.get(url + "/users/get_knowledgelevels"));

const get_LanguagesProgramming = async () => await (await axios.get(url + "/users/get_LanguagesProgramming"));

const login = async (data) => await axios.post(url + "/users/login_user", data)

const getUser = async (id_user) => await axios.get(url + "/users/get_userbyusername/" + id_user)

const getLanguage = async (id_user) => await axios.get(url + "/users/get_languagebyuser/" + id_user)

const getEducationByUser = async (id_user) => await axios.get(url + "/users/get_educationbyuser/" + id_user)

const getEducationById = async (id) => await axios.get(url + "/users/get_educationbyid/" + id)


/**
 * 
 * @param {Number} id Enter the language Id to search
 * @returns This method retur a json object
 */
const getLanguageById = async (id) => await axios.get(url + "/users/get_languagebyid/" + id)

/**
 * 
 * @param {Number} id Enter the language ID to delete
 * @returns This method return a error message or success message
 */
const deleteLanguage = async (id) => await axios.get(url + "/users/get_languagebyuser/" + id)

const deleteUser = async (id_user) => await axios.delete(`${url}/users/delete_user/${id_user}`)

export {
    getUsers,
    login,
    getUser,
    deleteUser,
    getGenders,
    getRols,
    getLanguage,
    getLanguageLevels,
    get_LanguagesProgramming,
    deleteLanguage,
    getLanguageById,
    getEducationById,
    getEducationByUser
} 