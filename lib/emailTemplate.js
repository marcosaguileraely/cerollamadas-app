/**
 * LEGAL COPY — DO NOT AUTO-MODIFY. Text approved for Habeas Data facilitation in Colombia.
 */

const buildEmailBody = (userData) => {
  const {
    fullName,
    idNumber,
    email,
    phone,
    address,
    sendAllChannels,
  } = userData

  return `
Solicitud de ejercicio del derecho de Habeas Data — Cese de comunicaciones

Por medio del presente, y en ejercicio del derecho fundamental de Habeas Data reconocido en la Constitución Política de Colombia y desarrollado en la Ley 1266 de 2008 y la Ley 1581 de 2012, solicito de manera formal que se cese el envío de comunicaciones comerciales, de cobro o promocionales a mis datos de contacto.

Datos del titular:
- Nombre completo: ${fullName || '[no indicado]'}
- Número de documento: ${idNumber || '[no indicado]'}
- Correo electrónico: ${email || '[no indicado]'}
- Teléfono: ${phone || '[no indicado]'}
- Dirección: ${address || '[no indicado]'}

${sendAllChannels ? 'Solicito que esta petición sea atendida a través de todos los canales oficiales de tratamiento de datos de la entidad.' : ''}

La presente solicitud ha sido enviada a través de la plataforma CeroLlamadas (cerollamadas.co), la cual actúa únicamente como canal de facilitación. CeroLlamadas no almacena los datos personales del titular ni actúa como intermediario una vez enviada esta comunicación. Toda relación posterior es exclusivamente entre el titular de los datos y la entidad destinataria.

Atentamente,
${fullName || 'El titular'}
`.trim()
}

module.exports = { buildEmailBody }
