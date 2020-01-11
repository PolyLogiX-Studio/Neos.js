class CloudMessage {
    constructor(){
        this.Message
    }
    static ExtractMessage(content){
        try {
            return (content?.Message??content) 
        } catch {
            return content;
        }
    }
}
module.exports = {CloudMessage}