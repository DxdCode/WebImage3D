import React from 'react';

const WhatWeDo = () => {
    return (
        <section className="px-4 md:px-24 py-12 md:py-20 bg-green-800 dark:bg-neutral-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Qué se hace</h3>
            <p className="text-base md:text-lg max-w-3xl mx-auto text-center mb-6">
                Nuestra plataforma genera modelos 3D automáticamente usando la API de MesHy. Visualiza e integra tus ideas de manera limpia y profesional.
            </p>
            <p className="text-center text-sm">
                Créditos: API de <a href="https://meshy.ai" target="_blank" className="underline text-orange-500">MesHy</a>
            </p>
        </section>
    );
};

export default WhatWeDo;
