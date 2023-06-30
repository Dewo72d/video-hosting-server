import { Injectable } from '@nestjs/common';


type videos = {
    id: number,
    name: string,
    description: string,
    length: number
}


const cards = [
    {
        id: 1000,
        name: 'PIZDA',
        description: 'SOSAT SYKA',
        length: 3222,
    },
    {
        id: 1100,
        name: 'AAAAA',
        description: 'Gays',
        length: 22,
    }];

@Injectable()
export class VideosService {
    sendRecently(): Array<videos> {
        console.log('SEND >>>>');
        return cards;
    }
}
