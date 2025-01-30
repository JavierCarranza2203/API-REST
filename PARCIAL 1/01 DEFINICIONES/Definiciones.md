# API, REST y RESTful

## ¿Qué es una API?
API significa **Application Programming Interface** (Interfaz de Programación de Aplicaciones). Es un conjunto de reglas y definiciones que permite que diferentes programas o sistemas se comuniquen entre sí. 

## ¿Qué es REST?
REST significa **REpresentational State Transfer** (Transferencia de Estado Representacional). Es un estilo de arquitectura que define un conjunto de restricciones para diseñar servicios web. Un servicio web que sigue estas reglas se llama **API REST**.

### Características de una API REST:
- Usa el protocolo HTTP.
- Sigue una estructura basada en recursos (como `/usuarios`, `/productos`).
- Utiliza métodos HTTP estándar como:
  - **GET** (Obtener datos)
  - **POST** (Crear un nuevo recurso)
  - **PUT** (Actualizar un recurso)
  - **DELETE** (Eliminar un recurso)
- No guarda el estado del cliente en el servidor (es "stateless").

## ¿Qué es RESTful?
Cuando una API sigue los principios de REST correctamente, se dice que es **RESTful**. En otras palabras, una **API RESTful** es una API que implementa todas las reglas y buenas prácticas de REST.