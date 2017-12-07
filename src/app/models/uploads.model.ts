export class Uploads {
    $key: string;
    file: File;
    url: string;
    progress: number;
    createdOn: Date = new Date();
    name: string;
    newTopics : string ;
    newContent: string;

    constructor(file: File) {
        this.file = file;
    }
}
