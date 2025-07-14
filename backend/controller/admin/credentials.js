import * as credentialService from "../../services/admin/credentials.js";

export const sendCredentialsToSingleUser = async (req, res) => {
  try {
    const response = await credentialService.sendEmailofIdPassToSingleUSer(req);
    console.log(req.body);
    
    res.status(response.status).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const sendCredentialsToBulk = async(req,res) => {
    try {
      console.log(req.file);
      
    const response = await credentialService.sendEmailofIdPassToBulk(req.file, req.body);
    res.status(response.status).json({ message: response.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}