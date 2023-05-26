const maps = document.querySelectorAll('.map')

console.log(maps)
if(maps.length > 0)
{
    maps.forEach(map => {
        const data = map.dataset;
        ymaps.ready(() => {
            let mapVar = new ymaps.Map(map , {
                center: [data.lat, data.lng],
                zoom: data.zoom,
                controls: []
            });

            if(data.dots)
            {
                const dotsArray = JSON.parse(data.dots)
                dotsArray.forEach(dot => {
                    dotPlacemark = new ymaps.Placemark([dot.lat, dot.lng], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: 'img/mark.svg',
                        iconImageSize: [30, 42],
                        iconImageOffset: [-5, -38]
                    });
            
                    mapVar.geoObjects.add(dotPlacemark)
                });
                
                
            }


        });


    });

}

