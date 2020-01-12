class CloudMessage {
    constructor(){
        this.Message = new String()
    }
    static ExtractMessage(content){
        try {
            return content.Message || content
        } catch(err) {
            return content;
        }
    }
}
module.exports = {CloudMessage}