import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/jean/Andromeda_USV/andromeda_project/middleware_ws/src/install/andromeda_middleare'
