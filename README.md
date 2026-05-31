# PSICOFI - Plataforma Psicológica de la Facultad de Ingeniería

**Proyecto Integrador - Facultad de Ingeniería, Universidad Autónoma de San Luis Potosí (UASLP) Semestres 2023/II-2024/II**

---

## 1. Descripción General

PSICOFI es una **aplicación web** desarrollada como proyecto integrador para el **Departamento de Atención Psicológica (DAP)** de la Facultad de Ingeniería.

El sistema tiene como objetivo central **modernizar y optimizar** la atención psicológica y educativa brindada a los alumnos, centralizando la administración de citas y digitalizando los registros de **salud mental**.

---

## 2. Objetivo Principal

Desarrollar e implementar un sistema integral de gestión de pacientes en plataforma web para el DAP de la Facultad de Ingeniería, con el fin de modernizar sus procesos, mejorar la atención psicológica y educativa brindada a los alumnos, y optimizar la administración de los registros relacionados con la salud mental.

---

## 3. Arquitectura y Tecnologías

El proyecto sigue un modelo de arquitectura **cliente-servidor**, separando completamente la lógica de la API del *frontend* visual.

| Componente | Módulo | Tecnología Principal | Notas |
| :--- | :--- | :--- | :--- |
| **Backend (API)** | `PSICOFI-Api` | **Laravel** (PHP 8.x) | Servidor que gestiona la lógica de negocio y las peticiones a la base de datos. |
| **Frontend (Cliente)** | `PSICOFI-Web` | **Angular** | Interfaz de usuario encargada de la visualización y el diseño de la plataforma. |
| **Base de Datos** | - | **MySQL** | Almacena toda la información de pacientes, citas y expedientes. |
| **Entorno Local** | - | **Laragon** | Utilizado para gestionar el servidor local (Apache, MySQL) y las versiones de PHP. |
| **Gestión de Paquetes** | - | **Composer** (PHP) y **npm** (Node.js/Angular) |

---

## 4. Instalación

Se recomienda usar **Laragon** para simplificar la configuración del entorno de desarrollo (PHP, MySQL) en Windows. El proyecto debe clonarse dentro de la carpeta `www` de Laragon.

### 4.1. Pre-requisitos

Asegúrate de tener instalados:

* **Laragon Full** (incluye Apache, MySQL, PHP)
* **Git**
* **Node.js** y **npm** (para Angular)

### 4.2. Pasos Iniciales

1.  **Clonar el Repositorio:** Navega a la carpeta de tu servidor local (ej. `C:\laragon\www`) y clona el repositorio principal.
    ```bash
    git clone [git@github.com:andreisabel/psicofi.git](https://github.com/andreisabel/psicofi.git)
    ```
2.  **Estructura:** El proyecto clonado contendrá la carpeta `PSICOFI`. Se recomienda **mover** la carpeta `PSICOFI-Api` (el backend de Laravel) un nivel arriba, a la carpeta `www` de Laragon, para facilitar su acceso.

### 4.3. Configuración del Backend (PSICOFI-Api)

1.  **Iniciar Servidor:** Inicia Laragon (**"Iniciar Todo"**).
2.  **Instalar Dependencias:** Abre la terminal de Laragon, navega a la carpeta **`PSICOFI-Api`** y ejecuta:
    ```bash
    composer install
    ```
3.  **Configurar Archivo `.env`:** Duplica el archivo `.env.example` y renómbralo a `.env`. Dentro de este archivo, configura la base de datos:
    ```ini
    DB_DATABASE=psicofi
    # Asegúrate que este nombre coincida con el nombre de tu base de datos en MySQL.
    ```
4.  **Generar Clave de Aplicación:**
    ```bash
    php artisan key:generate
    ```
5.  **Crear Base de Datos y Tablas (Solo la primera vez):**
    ```bash
    php artisan migrate:fresh
    ```
6. **Iniciar Servidor de Desarrollo:**
    ```bash
    php artisan serve
    # La API estará disponible en [http://127.0.0.1:8000](http://127.0.0.1:8000) (por defecto)
    ```

### 4.4. Configuración del Frontend (PSICOFI-Web)

1.  **Instalar Dependencias:** Abre una nueva terminal, navega a la carpeta **`PSICOFI/PSICOFI-Web`** y ejecuta:
    ```bash
    npm install --force
    ```
2.  **Iniciar Aplicación Web:**
    ```bash
    ng serve
    ```
    * **Nota Importante:** El servidor de Laragon (`php artisan serve`) debe estar activo mientras se ejecuta `ng serve` para que la aplicación web pueda comunicarse con la API.

---

## 5. Autores y Contribuciones

Este proyecto fue desarrollado por alumnos de **Ingeniería en Sistemas Inteligentes** de la UASLP como parte de la materia *Proyecto Computacionales I - Proyectos Computacionales III*.

| Nombre | Rol |
| :--- | :--- |
| **BAUTISTA GÓMEZ JUAN PABLO** | Desarrollador Full-Stack |
| **HERNÁNDEZ ALONSO JESÚS ALEJANDRO** | Desarrollador Frontend |
| **RAMÍREZ PADRÓN ERICK ENRIQUE** | Administrador de Servidor |
| **VEGA MARQUEZ ANDREA ISABEL** | Desarrollador Frontdn - QA |

**Asesoría:** Sandra Edith Nava Muñoz
**Docente:** Edgar Fransisco Castillo Barrera
