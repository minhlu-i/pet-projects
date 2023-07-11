import pika


connection_parameters = pika.ConnectionParameters('localhost')
connection = pika.BlockingConnection(connection_parameters)
channel = connection.channel()
channel.queue_declare(queue='letterbox')

message = 'Hello World'
channel.basic_publish(body=message, exchange='', routing_key='letterbox')

print(f'sent: {message}')

connection.close()
