const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api gestion de proyectos',
            version: '1.0.0',
            description: 'API REST para la gestion de proyectos',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Elmer Nina' },
                        email: { type: 'string', example: 'elmer@example.com' },
                        creadoEn: { type: 'string', format: 'date-time' }
                    },
                },
                crearUsuario: {
                    type: 'object',
                    required: ['nombre', 'email', 'password'],
                    properties: {
                        nombre: { type: 'string', example: 'Elmer Nina' },
                        email: { type: 'string', example: 'elmer@example.com' },
                        password: { type: 'string', example: 'Seguro123!!' }
                    },
                },
                actualizarUsuario: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
                Proyecto: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Cubo Rubi Resolv' },
                        descripcion: { type: 'string', example: 'Programa resolvedor de cubo ribick' },
                        usuarioId: { type: 'integer', example: 1 },
                        creadoEn: { type: 'string', format: 'date-time' },
                        actualizadoEn: { type: 'string', format: 'date-time', nullable: true, example: '2026-04-27T10:00:00Z' },
                        actualizadoPorId: { type: 'integer', nullable: true, example: 2 },
                        actualizadoPor: {
                            type: 'object',
                            nullable: true,
                            properties: {
                                nombre: { type: 'string', example: 'Ana Gomez' }
                            }
                        }
                    }
                },
                CrearProyecto: {
                    type: 'object',
                    required: ['nombre', 'usuarioId'],
                    properties: {
                        nombre: { type: 'string', example: 'Nuevo Proyecto' },
                        descripcion: { type: 'string', example: 'Descripción opcional' },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                ActualizarProyecto: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        usuarioId: { type: 'integer' },
                        actualizadoPorId: {
                            type: 'integer',
                            example: 2,
                            description: 'ID del usuario que realiza la modificación'
                        }
                    }
                },
                Tarea: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Diseñar base de datos' },
                        descripcion: { type: 'string', example: 'Crear tablas iniciales' },
                        estado: { type: 'string', enum: ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'] },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1, nullable: true },
                        creadoEn: { type: 'string', format: 'date-time' }
                    }
                },
                CrearTarea: {
                    type: 'object',
                    required: ['titulo', 'proyectoId'],
                    properties: {
                        titulo: { type: 'string', example: 'Terminar CRUD' },
                        descripcion: { type: 'string' },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                actualizaTarea: {
                    type: 'object',
                    properties: {
                        titulo: { type: 'string' },
                        descripcion: { type: 'string' },
                        estado: { type: 'string', enum: ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'] },
                        usuarioId: { type: 'integer' },
                        proyectoId: { type: 'integer' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
