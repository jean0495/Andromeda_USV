from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='andromeda_middleware',
            executable='camera_node',
            name='camera_node',
            output='screen',
        ),
        Node(
            package='andromeda_middleware',
            executable='sensor_node',
            name='sensor_node',
            output='screen',
        ),
        Node(
            package='andromeda_middleware',
            executable='mqtt_bridge_node',
            name='mqtt_bridge_node',
            output='screen',
        ),
    ])