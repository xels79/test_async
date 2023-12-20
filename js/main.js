// console.log("test");
// console.log("Задание 5 - Решите 3 задачу, используя, функцию delay: старт(время засечено)");
// const delay=function(ms){
//     return new Promise( resolve => setTimeout( ()=>resolve(), ms ) );
// }
// const task5Millis = Date.now();
// const promises2 = [
//     delay(1000).then( () => 'Я'),
//     delay(800).then( () => 'использую'),
//     delay(1200).then( () => 'вызов'),
//     delay(700).then( () => 'обещаний'),
//     delay(500).then( () => 'параллельно')
// ];
// Promise.all(promises2).then( result => console.log( `Задание 5 результат (${Math.round(Date.now()-task5Millis)}ms): "` + result.join(" ") + '"' ));

// // const tP = new Promise((res)=>setTimeout(()=>res("Promise ok"),10)).then(console.log);
// //     new Promise((res)=>{
// //         setTimeout(()=>{
// //             for (let i=0;i<10000;i++){
// //                 res("r - "+ i);
// //             }
// //             res("Loop 1 end!");
// //         },100);
// //     }).then(console.log);
// //     for (let i=0;i<10000;i++){
// //         console.log("-");
// //     }
// (async function(){
//     const filmsURL=(await fetch('https://swapi.dev/api/planets?search=Tatooine').then(res=>res.json())).results.map(item=>item.films.map(filmUrl=>film));
//     const tmp = filmsURL[0].map(filmUrl=>{
//         console.log(filmUrl);
//         return filmUrl;
//     });
//     const filmsPromises = filmsURL.map((filmUrl)=>{
//             console.log(filmUrl);
//             return new Promise(resolve=>{
//             resolve(filmUrl);
//             }).then(res=>res);
//     });
//     //const films = await Promise.all()
//     console.log(filmsPromises);
// })();


const getPlanetsPage = function (url) {
    return new Promise(resolve=>{
        fetch(url)
            .then(response=>response.json())
            .then(respData=>{
                if (respData.next){
                    getPlanetsPage(respData.next)
                        .then( subRespData => resolve([...respData.results, ...subRespData]));
                }else{
                    resolve(respData.results)
                }
            });
    });
};
// (async function(){
//     const planets=await getPlanetsPage('https://swapi.dev/api/people');
//     console.log(planets);
// })();

const getSearch = function(url, searchingName){
    return new Promise((resolve,reject)=>{
        if (searchingName){
            fetch(url)
                .then(response=>response.json())
                .then(respData=>{
                    const person = respData.results.filter(item => item.name === searchingName);
                    if (!person.length && respData.next){
                        getSearch(respData.next, searchingName).then( subRespData => resolve(subRespData));
                    }else if (person.length){
                        resolve(person[0]);
                    }else{
                        reject(`Персонаж "${searchingName}" - не найден.`);
                    }
                });
        }else{
            reject('Не указано имя для поиска');
        }
    });
};
(async function(){
    try{
        const person=await getSearch('https://swapi.dev/api/people', 'Anakin Skywalker');
        console.log(person);
    }catch(err){
        console.error(err);
    }
})();