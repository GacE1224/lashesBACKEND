const Usuario = require('../../modelos/usuarios');
const jwt = require('jsonwebtoken');



const JWT_SECRET = process.env.JWT_SECRET || 'clave_segura';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';



//crear usuario 

exports.crearUsuario = async(req, res) => {
    try {
        console.log('📨 Datos recibidos:', req.body);

        const { nombre, correo, password } = req.body;

        const adminEmails = [
            "studiolashesadmmi_operator_1@gmail.com",
            "studiolashesadmmi_operator_2@gmail.com",
            "studiolashesadmmi_operator_3@gmail.com"
        ];

        const rolAsignado = adminEmails.includes(correo.toLowerCase()) ? 'admin' : 'cliente';

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password,
            rol: rolAsignado
        });

        const guardado = await nuevoUsuario.save();

        console.log(`✅ Usuario creado: ${guardado.correo} | Rol: ${guardado.rol}`);

        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: {
                id: guardado._id,
                nombre: guardado.nombre,
                correo: guardado.correo,
                rol: guardado.rol
            }
        });

    } catch (err) {
        console.error('❌ Error al crear usuario:', err.message);

        if (err.code === 11000) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        res.status(400).json({ error: err.message });
    }
};


//inicio de sesion app movil 

exports.loginMovil = async(req, res) => {
    console.log('📲 Petición recibida desde Android:', req.body);
    try {
        // 1. Recibimos los datos como los envía Android

        const { username, password } = req.body;

        // 2. Buscamos al usuario en la BD usando el 'username' para el campo 'correo'
        const usuario = await Usuario.findOne({ correo: username });

        // 3. Si el usuario no existe, respondemos como Android espera
        if (!usuario) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // 4. REUSAMOS tu lógica del modelo. ¡Perfecto!
        const esCorrecta = await usuario.compararContraseña(password);

        // 5. Si la contraseña no es correcta, respondemos como Android espera
        if (!esCorrecta) {
            return res.status(401).json({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }

        // 6. ¡Éxito! Respondemos exactamente como Android espera
        res.status(200).json({
            status: "success",
            message: `¡Bienvenido ${usuario.nombre}!` // Usamos el nombre del usuario
        });

    } catch (error) {
        console.error('❌ Error en loginMovil:', error);
        res.status(500).json({
            status: "server_error",
            message: "Error interno del servidor"
        });
    }
};


//inicio de sesion 

exports.loginUsuario = async(req, res) => {
    const { correo, password } = req.body;

    try {
        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
        }

        // Verificar contraseña con argon2
        const esCorrecta = await usuario.compararContraseña(password);
        if (!esCorrecta) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
        }

        // Datos para el token
        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo
        };

        // Crear token JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Lista de correos de administradores
        const adminEmails = [
            "studiolashesadmmi_operator_1@gmail.com",
            "studiolashesadmmi_operator_2@gmail.com",
            "studiolashesadmmi_operator_3@gmail.com"
        ];
        const isAdmin = adminEmails.includes(usuario.correo.toLowerCase());

        // Enviar respuesta
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('❌ Error en loginUsuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
}


exports.actualizarUsuario = async(req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }


        if (nombre) usuario.nombre = nombre;
        if (correo) usuario.correo = correo;
        if (contraseña) usuario.contraseña = contraseña;
        await usuario.save();

        res.status(200).json({
            mensaje: 'Usuario actualizado correctamente.',
            usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo }
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
}


//eliminacion 

exports.eliminarUsuario = async(req, res) => {

    try {

        const { id } = req.params;


        const usuarioEliminado = await Usuario.findByIdAndDelete(id);


        if (!usuarioEliminado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado.'
            });
        }


        res.status(200).json({
            mensaje: 'Usuario eliminado exitosamente.',
            usuario: usuarioEliminado
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            mensaje: 'Error en el servidor al intentar eliminar el usuario.'
        });
    }
}