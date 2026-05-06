from setuptools import setup, find_packages
import os
from glob import glob

package_name = 'andromeda_middleware'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(include=['andromeda_middleware', 'andromeda_middleware.*']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        
        (os.path.join('share', package_name, 'launch'),
            glob('launch/*.launch.py')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='jean',
    maintainer_email='jeans.gargano@gmail.com',
    description='ROS2 middleware',
    license='MIT',
    entry_points={
        'console_scripts': [
            'sensor_node     = andromeda_middleware.nodes.sensor_node:main',
            'mqtt_bridge_node = andromeda_middleware.nodes.mqtt_bridge_node:main',  
        ],
    },
)