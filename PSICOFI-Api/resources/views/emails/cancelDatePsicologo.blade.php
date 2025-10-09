<!DOCTYPE html>
<html>
<head>
    <title>DAP: Cancelación de Cita</title>
</head>
<body>
    <div style="background-color: #004A98; color:white; font-size: x-large; font-weight: bold; font-family: Arial, Helvetica, sans-serif; padding: 20px 0px 0px 0px">
        <span style="padding-left: 20px;">UASLP</span><span style="padding: 0px 10px">|</span><span>DAP</span>
        <div style="background-color:#00B2E3; height:10px; margin-top:20px"></div>
    </div>
    <div id="content" style="background-color: #fafafa; padding: 30px; font-size: x-medium; font-family: Arial, Helvetica, sans-serif;">
        <h1>Hola, {{ $details['name'] }}</h1>
        <p>Lamentamos informarte que el psicólogo <b>{{ $details['psicologo'] }}</b> ha cancelado la cita que tenías programada.</p>
        <h2>Detalles de la cita</h2>
        <p>Fecha: {{ $details['fecha'] }}</p>
        <p>Hora: {{ $details['hora'] }}</p>
        <br><br>
        <span style="font-size: small; justify-content: end; display: flex;">Este sólo es un email de confirmación automatizado, por favor no responder al destinatario.</span>
    </div>
    <div style="background-color: #004A98; color:white; font-size: x-medium; padding: 20px; font-weight: bold;font-family: Arial, Helvetica, sans-serif">
        Facultad de Ingeniería &copy;
    </div>
</body>
</html>
